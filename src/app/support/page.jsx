import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const faqs =[
  {
    "value": "faq1",
    "question": "How do I reset my password?",
    "answer": "Go to your account settings and click 'Reset Password'. Follow the instructions sent to your email."
  },
  {
    "value": "faq2",
    "question": "Where can I find my completed and ongoing courses?",
    "answer": "Visit your dashboard and open the 'My Courses' tab to view ongoing, completed, and upcoming courses."
  },
  {
    "value": "faq3",
    "question": "Can I download course materials for offline use?",
    "answer": "Yes, if the instructor has enabled downloads. Look for a download icon next to each resource."
  },
  {
    "value": "faq4",
    "question": "Why can't I access a module even after enrolling?",
    "answer": "Some modules require prerequisites. Check your course timeline or contact support if you're blocked unexpectedly."
  },
  {
    "value": "faq5",
    "question": "How do I submit assignments or quizzes?",
    "answer": "Go to the module page and use the submission section. You’ll receive a confirmation once submitted."
  },
  {
    "value": "faq6",
    "question": "Can I message my instructor directly?",
    "answer": "Yes, use the 'Messages' tab in your dashboard or the 'Contact Instructor' button on the course page."
  },
  {
    "value": "faq7",
    "question": "What happens if I miss a live session?",
    "answer": "Recordings are usually available within 24 hours under the 'Live Sessions' tab or course timeline."
  },
  {
    "value": "faq8",
    "question": "How do I track my progress?",
    "answer": "Your progress bar updates as you complete modules, quizzes, and assignments. It’s visible on the course page."
  },
  {
    "value": "faq9",
    "question": "How do I report a technical issue or bug?",
    "answer": "Use the 'Support' tab or fill out the contact form. Include screenshots and a description of the issue."
  },
  {
    "value": "faq10",
    "question": "Can I retake a quiz or assignment?",
    "answer": "Retake policies vary by course. Check the module instructions or ask your instructor for clarification."
  }
]

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="py-4">
        <SidebarTrigger />
        <div className="top-0 p-8 flex flex-col w-full h-14 shrink-0 items-center gap-2 bg-background">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Find answers or reach out for help</p>
      </div>

      {/* FAQ Section */}
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        </CardHeader>
        <CardContent>
        <Accordion type="single" collapsible>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-semibold">Contact Us</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" type="email" />
          <Textarea placeholder="Describe your issue..." rows={5} />
          <Button className="w-full">Submit Request</Button>
        </CardContent>
      </Card>

      {/* Support Options */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Live Chat</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chat with our support team in real-time. Available 9 AM – 6 PM IST.
            </p>
            <Button variant="outline" className="mt-4 w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Email Support</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Send us an email and we’ll get back within 24 hours.
            </p>
            <Button variant="outline" className="mt-4 w-full">Send Email</Button>
          </CardContent>
        </Card>
      </div> */}
    </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
