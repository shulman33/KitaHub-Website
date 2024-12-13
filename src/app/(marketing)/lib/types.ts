export interface StepItemProps {
  number: string;
  title: string;
  description: string | Array<{ role: string; text: string }>;
  imageUrl: string;
  alignment: "left" | "right";
}

export interface ButtonProps {
  href: string;
  text: string;
  variant: "primary" | "secondary";
  withIcon?: boolean;
  border?: boolean;
  textColor?: string;
  textSize?: string;
}

export interface NavLinksProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

export interface SubjectButtonProps {
  icon: string;
  subject: string;
}

export interface TextFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DropdownInputProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export interface InfoSectionProps {
  imagePosition?: "left" | "right";
  imageSrc?: string;
  withButton?: boolean;
  header?: string;
  content: { paragraph: string }[];
}
