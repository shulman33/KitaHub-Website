export interface StepItemProps {
  number: string;
  title: string;
  description: string | Array<{ role: string; text: string }>;
  imageUrl: string;
  alignment: "left" | "right";
}
