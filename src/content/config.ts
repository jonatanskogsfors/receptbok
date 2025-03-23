import { defineCollection, z } from "astro:content";
import * as glob from 'glob';
import * as fs from 'fs';
import { Recipe } from '@cooklang/cooklang-ts';
import * as path from 'path';

const recipes = defineCollection({
    loader: async () => {
        const recipeFiles = glob.sync('src/content/**/*.cook');
        
        return recipeFiles.map((filePath) => {
            const recipeData = fs.readFileSync(filePath, 'utf8');
            const recipe = new Recipe(recipeData)
            console.log(recipe)
            return {
                id: path.basename(filePath),
                recipe: recipe
            }
        });
    },
    schema: z.object({
        ingredients: z.array(z.any()).default([]),
        cookwares: z.array(z.any()).default([]),
        metadata: z.any().optional(),
        steps: z.array(z.array(z.any())).default([]),
    })
  });

  export const collections = { 'bread': recipes };