import { MiaModel } from '@doroteati/mia-core';

export class MiaHelp extends MiaModel {
  id: number = 0;
  language_id: number = 0;
  category_id: number = 0;
  title: string = '';
  content: string = '';
  likes: number = 0;
  dislikes: number = 0;
  status: number = 0;
  created_at: string = '';
  updated_at: string = '';
}
