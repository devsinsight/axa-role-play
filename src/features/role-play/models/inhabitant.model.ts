export class InhabitantModel {
  id: number | undefined;
  name: string | undefined;
  thumbnail: string | undefined;
  age: number = 0;
  weight: number = 0;
  height: number | undefined;
  hair_color: number | undefined;
  professions: Array<string> = [];
  friends: Array<string> = [];
}
