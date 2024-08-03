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
