import React from 'react';

const HeroSection = () => {
  return (
    <section className="text-center flex flex-col items-center">

      <div className="glass px-5 py-3 rounded-full mb-8">
        ML-powered dining discovery
      </div>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "24px"
        }}
      >
        CUIZINE RECOMMENDER
      </h3>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "96px",
          lineHeight: "0.9",
          color: "#111827",
          maxWidth: "1000px",
          textAlign: "center",
          margin: "0 auto"
        }}
      >
        Find restaurants that{" "}
        <span
          style={{
            color: "#ec675d",
            fontStyle: "italic",
          }}
        >
          actually
        </span>
        <br />
        match your taste.
      </h1>

    </section>
  );
};

export default HeroSection;