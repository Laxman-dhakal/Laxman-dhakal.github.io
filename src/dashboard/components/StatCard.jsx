import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, trend, change }) => {
  const Icon = icon;
  return (
    <motion.article className="stat-card" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="stat-card-icon"><Icon /></div>
      <div>
        <p className="stat-card-label">{label}</p>
        <h3>{value}</h3>
      </div>
      <div className={`stat-card-change ${trend}`}>{trend === 'positive' ? '+' : ''}{change}</div>
    </motion.article>
  );
};

export default StatCard;
