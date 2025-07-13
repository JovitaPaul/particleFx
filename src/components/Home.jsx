import React from 'react';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.05 }}
      className="container py-12 text-center"
    >
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Welcome to ParticleEffect!
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground">
        Explore the amazing particle effects and unleash your creativity.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-base text-muted-foreground">
        This platform allows you to visualize and customize stunning particle animations.
      </p>
    </motion.div>
  );
};

export default Home;
