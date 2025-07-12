import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle, LucideIcon } from 'lucide-react';

interface IconProps extends React.ComponentProps<'svg'> {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

function Icon({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  ...props
}: IconProps) {
  const IconComponent: LucideIcon = LucideIcons[name] as LucideIcon;

  if (!IconComponent) {
    return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
  }

  return <IconComponent
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  />;
}
export default Icon;