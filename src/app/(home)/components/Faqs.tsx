"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/list";

const Faqs = () => {
    return (
        <div className="py-10">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-6">
                    <h1 className="text-3xl font-serif font-semibold text-center mb-1">FAQs</h1>
                    <p>Got questions? We've got answers for you...</p>
                </div>
                <div className="w-[70%] max-w-7xl flex flex-col justify-center gap-y-2 mb-4">
                    {faqs.map((faq, index) => (
                        <Accordion key={index} type="single" collapsible>
                            <AccordionItem className="px-4" value={index.toString()}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Faqs;