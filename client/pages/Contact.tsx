import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Heart,
  CheckCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "HopeHands NGO Headquarters",
        "123 Hope Street, Suite 400",
        "Global City, State 12345",
        "United States"
      ]
    },
    {
      icon: Phone,
      title: "Phone",
      details: [
        "Main: +1 (555) 123-4567",
        "Emergency: +1 (555) 987-6543",
        "Toll-free: 1-800-HOPE-NGO"
      ]
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "General: info@hopehands.org",
        "Partnerships: partners@hopehands.org",
        "Media: press@hopehands.org"
      ]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed",
        "Emergency Line: 24/7"
      ]
    }
  ];

  const socialMedia = [
    { icon: Facebook, name: "Facebook", url: "#", handle: "@HopeHandsNGO" },
    { icon: Twitter, name: "Twitter", url: "#", handle: "@HopeHands" },
    { icon: Instagram, name: "Instagram", url: "#", handle: "@hopehands_official" },
    { icon: Linkedin, name: "LinkedIn", url: "#", handle: "HopeHands NGO" }
  ];

  const offices = [
    {
      region: "North America",
      location: "New York, USA",
      address: "123 Hope Street, Global City",
      phone: "+1 (555) 123-4567",
      email: "usa@hopehands.org"
    },
    {
      region: "Europe",
      location: "London, UK", 
      address: "45 Charity Lane, London",
      phone: "+44 20 1234 5678",
      email: "europe@hopehands.org"
    },
    {
      region: "Africa",
      location: "Nairobi, Kenya",
      address: "67 Development Ave, Nairobi",
      phone: "+254 20 123 4567",
      email: "africa@hopehands.org"
    },
    {
      region: "Asia Pacific",
      location: "Mumbai, India",
      address: "89 Hope Road, Mumbai",
      phone: "+91 22 1234 5678", 
      email: "asia@hopehands.org"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">Get in Touch</Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Let's Work Together to{" "}
              <span className="text-primary">Change Lives</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have questions about our projects? Want to partner with us? Looking to join our mission? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold">Send Us a Message</h2>
                </div>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          required
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Contact Information</h2>
                <p className="text-muted-foreground">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-muted-foreground text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Follow Us</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.url}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-sm">{social.name}</div>
                            <div className="text-xs text-muted-foreground">{social.handle}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Visit Our Headquarters</h2>
            <p className="text-lg text-muted-foreground">
              Located in the heart of Global City, our headquarters welcomes visitors and partners.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                {/* Placeholder for Google Maps */}
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Interactive Map</h3>
                    <p className="text-muted-foreground">
                      Google Maps integration would be embedded here
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      123 Hope Street, Suite 400, Global City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline">Global Presence</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Our Offices Worldwide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              With offices across four continents, we're always close to the communities we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <Badge variant="secondary">{office.region}</Badge>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{office.location}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{office.address}</p>
                      <p className="flex items-center justify-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{office.phone}</span>
                      </p>
                      <p className="flex items-center justify-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{office.email}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Whether you want to volunteer, partner with us, or support our cause, we're here to help you get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="/membership">
                  Join Our Mission
                  <Heart className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="/projects">View Our Projects</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
