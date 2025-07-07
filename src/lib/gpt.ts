import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let res: string = ""; 
    let output_format_prompt: string = `\nYou must output ${
      list_output && "an array of objects in"
    } the following JSON format: ${JSON.stringify(
      output_format
    )}. \nImportant rules:
1. Use double quotes for all strings and property names
2. Never escape characters in the output values
3. Never wrap the entire response in markdown code blocks
4. If a value contains double quotes, replace them with single quotes`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates dynamic content to generate.`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of JSON objects, one for each input element.`;
    }

    try {
      const response = await openai.createChatCompletion({
        temperature: temperature,
        model: model,
        messages: [
          {
            role: "system",
            content: system_prompt + output_format_prompt + error_msg,
          },
          { role: "user", content: user_prompt.toString() },
        ],
      });

      let res: string = response.data.choices[0].message?.content?.trim() || "";

      // Remove markdown code blocks if present
      res = res.replace(/```json/g, '').replace(/```/g, '').trim();

      if (verbose) {
        console.log("System prompt:", system_prompt + output_format_prompt + error_msg);
        console.log("\nUser prompt:", user_prompt);
        console.log("\nGPT response:", res);
      }

      // Improved JSON parsing with better error handling
      let output: any;
      try {
        output = JSON.parse(res);
      } catch (e) {
        // Try to fix common JSON issues
        const fixedJson = res
          // Fix unquoted property names
          .replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3')
          // Fix unquoted string values
          .replace(/:\s*([a-zA-Z0-9_][^,}\]]*)([,\]}])/g, ': "$1"$2')
          // Fix escaped quotes
          .replace(/\\"/g, '"')
          // Convert single quotes to double quotes
          .replace(/'/g, '"');

        output = JSON.parse(fixedJson);
      }

      // Validate output structure
      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output should be an array of JSON objects");
        }
      } else {
        output = [output];
      }

      // Process each output item
      const validatedOutput = [];
      for (const item of output) {
        const processedItem: any = {};
        
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in item)) {
            throw new Error(`Missing required field: ${key}`);
          }

          // Handle array output formats
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            let value = Array.isArray(item[key]) ? item[key][0] : item[key];
            
            if (value.includes(":")) {
              value = value.split(":")[0];
            }
            
            if (!choices.includes(value) && default_category) {
              value = default_category;
            }
            
            processedItem[key] = value;
          } else {
            processedItem[key] = item[key];
          }
        }

        if (output_value_only) {
          const values = Object.values(processedItem);
          validatedOutput.push(values.length === 1 ? values[0] : values);
        } else {
          validatedOutput.push(processedItem);
        }
      }

      return list_input ? validatedOutput : validatedOutput[0];
    } catch (error: unknown) { // Explicitly type error as unknown
      // Handle the error with proper type checking
      if (error instanceof Error) {
        error_msg = `\n\nError in attempt ${i + 1}: ${error.message}\n\nPlease correct these errors and try again.`;
        console.error("An exception occurred:", error.message);
      } else {
        error_msg = `\n\nUnknown error occurred in attempt ${i + 1}`;
        console.error("An unknown exception occurred");
      }

      if (res) { // Now res is in scope
        console.error("Current invalid response:", res);
      }

      if (i === num_tries - 1) {
        throw new Error(`Failed after ${num_tries} attempts: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`);
      }
    }
  }

  throw new Error("Failed to get valid output after multiple attempts");
}