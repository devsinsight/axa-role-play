export class InhabitantModel {
  id: number | undefined;
  name: string | undefined;
  thumbnail: string | undefined;
  age: number | undefined;
  weight: number | undefined;
  height: number | undefined;
  hair_color: number | undefined;
  professions: Array<string> = [];
  friends: Array<string> = [];
}
