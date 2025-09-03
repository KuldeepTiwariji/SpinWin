import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Shield, Diamond } from "lucide-react";

export default function About() {
  const stats = [
    { value: "10M+", label: "Players" },
    { value: "500+", label: "Games" },
    { value: "24/7", label: "Support" }
  ];

  const values = [
    {
      icon: Crown,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our platform, from game design to customer service."
    },
    {
      icon: Shield,
      title: "Security", 
      description: "Your safety and privacy are our top priorities, protected by industry-leading security measures."
    },
    {
      icon: Diamond,
      title: "Innovation",
      description: "We continuously push boundaries to deliver cutting-edge gaming experiences."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      experience: "20+ years in gaming industry",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400"
    },
    {
      name: "Michael Chen", 
      role: "Chief Technology Officer",
      experience: "Former Silicon Valley engineer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design", 
      experience: "Award-winning UX designer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl font-serif font-bold text-center text-primary mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="about-page-title"
        >
          About Ashok Gaming Gaming
        </motion.h1>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-6" data-testid="our-story-title">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded with a vision to redefine online gaming, Ashok Gaming Gaming represents the pinnacle of digital entertainment. We combine cutting-edge technology with elegant design to create an unparalleled gaming experience.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our platform features the most sophisticated casino games, from classic poker to modern slot machines, all designed with the discerning player in mind.
            </p>
            <div className="flex items-center space-x-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  data-testid={`stat-${stat.label.toLowerCase()}`}
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522158637959-30385a09e0da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Luxurious casino interior with golden lighting" 
              className="rounded-2xl shadow-2xl w-full"
              data-testid="about-hero-image"
            />
          </motion.div>
        </div>

        {/* Mission & Values */}
        <motion.div 
          className="grid md:grid-cols-3 gap-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="values-section"
        >
          {values.map((value, index) => (
            <motion.div 
              key={value.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              data-testid={`value-${value.title.toLowerCase()}`}
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="bg-card rounded-2xl p-12 border border-border"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="team-section"
        >
          <h2 className="text-4xl font-serif font-bold text-center text-primary mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                data-testid={`team-member-${member.name.toLowerCase().replace(' ', '-')}`}
              >
                <img 
                  src={member.image} 
                  alt={`${member.name} portrait`} 
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4" 
                />
                <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                <p className="text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.experience}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
