import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What is Superhomess, and how does it work?",
      answer:
        "Superhomess is a leading short-term rental company specializing in luxury and convenient stays. We connect property owners with travelers looking for high-quality accommodations. Our expert team handles everything, from property listings to guest management, ensuring a seamless experience for both hosts and guests.",
    },
    {
      question: "How can I book a stay with Superhomess?",
      answer:
        "Booking a stay with Superhomess is easy! Browse our selection of premium properties, select your dates and location, and complete your reservation in just a few clicks. For any assistance, our support team is available at support@superhomess.com or via phone at 9301696266 or 7509972213.",
    },
    {
      question: "What services do you provide for property owners?",
      answer:
        "Superhomess offers comprehensive property management services, including creating professional listings, managing guest communication, coordinating cleaning and maintenance, and ensuring a hassle-free experience for property owners. Partner with us to maximize your property’s rental income.",
    },
    {
      question: "Are Superhomess stays family-friendly?",
      answer:
        "Yes! Many of our properties are designed to be family-friendly, offering features such as fully equipped kitchens, spacious living areas, and child-friendly amenities. Please check individual property listings for specific details.",
    },
    {
      question: "Can I list my property with Superhomess?",
      answer:
        "Absolutely! Listing your property with Superhomess is a simple process. Reach out to us at contact@superhomess.com, and our team will guide you through every step to help you start earning from your property.",
    },
    {
      question:
        "What makes Superhomess different from other short-term rental services?",
      answer:
        "Superhomess stands out for its focus on quality, transparency, and customer satisfaction. We provide luxury accommodations, seamless property management, and personalized services for both property owners and guests, making us a trusted partner for all your rental needs.",
    },
    {
      question: "Are there any additional fees I should know about as a guest?",
      answer:
        "All fees, including service charges, cleaning fees, and applicable taxes, are transparently displayed during the booking process. There are no hidden costs, ensuring you know exactly what you’re paying for.",
    },
    {
      question: "What is the cancellation policy for bookings?",
      answer:
        "For details on our cancellation policy, please refer to our Privacy Policy section. If you have any further questions, feel free to contact our support team at support@superhomess.com or call us at 9301696266 or 7509972213.",
    },
    {
      question:
        "How does Superhomess ensure the safety and cleanliness of properties?",
      answer:
        "We adhere to stringent safety and hygiene protocols. All properties are thoroughly inspected and professionally cleaned before every guest's arrival to ensure a safe and comfortable stay.",
    },
    {
      question: "Do you provide long-term rental options?",
      answer:
        "Yes, we offer flexible rental options for both short-term and long-term stays. Contact our team at support@superhomess.com to explore extended stay packages at discounted rates.",
    },
    {
      question: "How can I contact Superhomess for support?",
      answer:
        "Our support team is here to assist you 24/7. You can reach us via email at support@superhomess.com or by calling 9301696266 or 7509972213.",
    },
    {
      question: "What types of properties can I find on Superhomess?",
      answer:
        "Superhomess offers a variety of properties, including apartments, villas, and service apartments for corporate stays. Whether you’re planning a family vacation or a business trip, we have the perfect property for you.",
    },
    {
      question: "How do you handle check-in and check-out?",
      answer:
        "We offer flexible check-in and check-out options. Many of our properties also feature self-check-in facilities for added convenience. Specific details will be shared with you upon booking confirmation.",
    },
    {
      question: "Can I host events or parties at Superhomess properties?",
      answer:
        "Event and party policies vary by property. Please review the house rules in the property listing or contact us at support@superhomess.com for clarification.",
    },
    {
      question: "What happens if there’s an issue during my stay?",
      answer:
        "Our support team is available 24/7 to resolve any issues during your stay. From maintenance requests to emergencies, you can rely on us for immediate assistance. Contact us at support@superhomess.com or call 9301696266 or 7509972213.",
    },
    {
      question: "What other services does Superhomess offer?",
      answer:
        "In addition to short-term rentals, we provide renovation and construction services to help you design, build, or renovate properties. For inquiries about these services, email us at contact@superhomess.com or call 9301696266 or 7509972213 to connect with our team.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="px-10">
      <div className="flex flex-col items-center justify-center mb-8">
        <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-500 text-3xl md:text-6xl font-semibold">
          HAVE
        </span>
        <span className="text-4xl md:text-8xl font-bold text-[#292929]">
          {" "}
          QUESTIONS
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-all"
          >
            <div
              className="flex justify-between items-center h-12 px-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {expandedIndex === index ? (
                <FaChevronUp className="text-yellow-500" />
              ) : (
                <FaChevronDown className="text-yellow-500" />
              )}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                expandedIndex === index ? "max-h-40 p-4" : "max-h-0 p-0"
              } overflow-hidden`}
            >
              <p className="text-left">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
