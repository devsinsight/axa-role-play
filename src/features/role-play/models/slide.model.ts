export class SlideModel {
  constructor(
    public checked: boolean,
    public direction: "right" | "left" | "up" | "down"
  ) {}
}
