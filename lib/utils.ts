import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(
  items: { name: string; quantity: number; price: number }[],
  total: number,
  name: string,
  phone: string,
  discount?: number
): string {
  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`
  );

  let message = `🔥 *UrbanForge Order Request*\n\n`;
  message += `Hi UrbanForge! I'd like to order:\n\n`;
  message += lines.join("\n");
  message += `\n\n`;
  message += `*Subtotal:* ${formatPrice(total)}\n`;

  if (discount && discount > 0) {
    const discountAmount = Math.round(total * (discount / 100));
    message += `*Discount (${discount}%):* -${formatPrice(discountAmount)}\n`;
    message += `*Total after discount:* ${formatPrice(total - discountAmount)}\n`;
  } else {
    message += `*Total:* ${formatPrice(total)}\n`;
  }

  message += `\n👤 *Name:* ${name}\n`;
  message += `📞 *Phone:* ${phone}\n\n`;
  message += `Please confirm availability and payment details. Thank you! 🙏`;

  return message;
}
