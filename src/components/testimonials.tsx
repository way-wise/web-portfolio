import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Mr.Fidel",
    role: "CEO",
    company: "TechCorp",
    content:
      "Great work! I am really happy with the expertise of the work and we will hire again. Thank you Way Wise",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "StartupX",
    content:
      "I Have a logistic company in California and I really was straggling to find a IT company to help me build my digital presence. And then i found Way Wise and I have got a great service and topnotch work from this guy.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthLabs",
    content:
      "The level of creativity and technical expertise they brought to our project was outstanding. Our conversion rates have improved significantly since launch.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-muted/30 py-20"
      id="customer-feedback"
    >
      <div className="container relative z-10">
        <div className="text-center">
          <h2 className="font-display max-w-sm mx-auto text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What our clients say about us
          </h2>
          <p className="mx-auto mt-4 max-w-[42rem] text-muted-foreground">
            We have a team of experienced and dedicated professionals who are
            committed to providing the best possible service to our clients.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="relative overflow-hidden border-none bg-background/50 backdrop-blur-sm shadow-lg"
            >
              <CardContent className="size-full flex flex-col gap-6 p-6">
                <blockquote className="text-muted-foreground">
                  &quot;{testimonial.content}&quot;
                </blockquote>
                <div className="grow flex flex-col justify-end gap-3">
                  <div className="flex gap-1">
                    {Array(testimonial.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="size-5 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  );
}
