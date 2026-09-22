"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/data/services";

export function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={cn("divide-y divide-line border-y border-line", className)}
    >
      {items.map((item, index) => (
        <AccordionPrimitive.Item
          key={index}
          value={`item-${index}`}
          className="relative transition-[box-shadow,background-color] duration-300 data-[state=open]:z-10 data-[state=open]:bg-paper data-[state=open]:shadow-[inset_3px_0_0_var(--signal),var(--shadow-card)]"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="focus-ring group flex w-full items-center justify-between gap-4 py-5 pl-4 pr-2 text-left">
              <span className="text-base font-medium text-ink transition-colors group-data-[state=open]:text-signal">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className="shrink-0 text-ink-muted transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-signal"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-sm leading-relaxed text-ink-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="pb-5 pl-4 pr-8">{item.answer}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
