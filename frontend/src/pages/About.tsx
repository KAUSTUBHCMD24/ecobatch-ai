import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Phone, Mail, Globe, MapPin, Award, Users, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center animate-fade-up space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          About <span className="text-primary italic">EcoBatch AI</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Pioneering the future of manufacturing through intelligent energy optimization and sustainable process management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up [animation-delay:200ms]">
        {/* Mission Statement */}
        <Card className="card-shine border-border overflow-hidden group">
          <CardHeader className="bg-primary/5 pb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-2 transition-transform group-hover:scale-110">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              To empower industrial production teams with AI-driven insights that drastically reduce carbon footprints while maximizing production efficiency. We believe technology and ecology must work in harmony.
            </p>
          </CardContent>
        </Card>

        {/* Vision Statement */}
        <Card className="card-shine border-border overflow-hidden group">
          <CardHeader className="bg-primary/5 pb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-2 transition-transform group-hover:scale-110">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Global Vision</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              A world where every factory operates with zero-waste energy consciousness. EcoBatch AI aims to be the standard operating system for the next generation of smart manufacturing plants globally.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team/Support Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-up [animation-delay:400ms]">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-6 py-2">
            "Founded by experts in both Industrial Engineering and Artificial Intelligence, EcoBatch was born from a simple observation: over 30% of energy usage in batch manufacturing is redundant. Our algorithms bridge that gap."
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">50+ Engineers</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Eco-Safe Certified</span>
            </div>
          </div>
        </div>

        {/* Contact/Support Card */}
        <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm shadow-xl shadow-primary/5 sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Phone className="h-5 w-5" /> Support Care
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
              Have questions or need technical assistance with your Batch optimization? Our dedicated team is here for you 24/7.
            </p>
            <div className="space-y-4">
              <div className="group flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 transition-all hover:border-primary/50 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Call Support</p>
                  <a href="tel:+918879882884" className="text-sm font-bold text-foreground hover:text-primary transition-colors">+91 8879882884</a>
                </div>
              </div>

              <div className="group flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 transition-all hover:border-primary/50 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Email Inquiry</p>
                  <a href="mailto:kaustubhsawant73@gmail.com" className="text-sm font-bold text-foreground hover:text-primary transition-colors">kaustubhsawant73@gmail.com</a>
                </div>
              </div>

              <div className="group flex items-center gap-2 p-3 rounded-xl border border-dashed border-primary/20 bg-primary/5">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground leading-tight italic">
                  Headquarters: Team SPARK Innovation Lab, Smart Energy Hub.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
