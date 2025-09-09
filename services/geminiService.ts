import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash-image-preview';

export interface EditImageResult {
  editedImage: {
    base64: string;
    mimeType: string;
  } | null;
  textResponse: string | null;
}

export const editImage = async (
  imageFile: File,
  prompt: string
): Promise<EditImageResult> => {
  try {
    const { base64, mimeType } = await fileToBase64(imageFile);

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let editedImage: EditImageResult['editedImage'] = null;
    let textResponse: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          editedImage = {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType,
          };
        } else if (part.text) {
          textResponse = part.text;
        }
      }
    }

    if (!editedImage) {
        if (textResponse) {
            throw new Error(`AI did not return an image. Response: ${textResponse}`);
        }
        throw new Error("The AI did not return an image in its response.");
    }

    return { editedImage, textResponse };
  } catch (error) {
    console.error("Error editing image with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to edit image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while editing the image.");
  }
};