import { motion } from "framer-motion";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Maintenance</h1>
      </motion.div>
    </div>
  );
};

export default Maintenance;