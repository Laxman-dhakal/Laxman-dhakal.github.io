import { motion } from 'framer-motion';
import { FaArrowRight, FaBolt, FaChartLine, FaPalette } from 'react-icons/fa';
import './HomeSignal.css';

const HomeSignal = () => (
  <section className="home-signal" aria-labelledby="signal-title">
    <div className="container signal-layout">
      <motion.div
        className="signal-copy"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="signal-eyebrow"><FaBolt /> DIGITAL, WITH DIRECTION</span>
        <h2 id="signal-title">Sharp design.<br /><span>Clear results.</span></h2>
        <p>Every website is built to feel distinctive at first glance and effortless at every interaction—from the visual system to the smallest responsive detail.</p>
        <a className="signal-link" href="#contact">Start a project <FaArrowRight /></a>
      </motion.div>

      <motion.div
        className="signal-workspace"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="signal-browser">
          <div className="browser-bar"><i /><i /><i /><span>your-next-project.dev</span></div>
          <div className="browser-content">
            <div className="browser-sidebar"><b>LD</b><span /><span /><span /><span /></div>
            <div className="browser-main">
              <div className="browser-heading"><span /><small>Creative dashboard</small></div>
              <div className="browser-tiles"><i /><i /><i /></div>
              <div className="browser-chart"><span /><span /><span /><span /><span /><span /><span /></div>
            </div>
          </div>
        </div>
        <div className="signal-card signal-card-design"><FaPalette /><span>System<br /><strong>Design-led</strong></span></div>
        <div className="signal-card signal-card-growth"><FaChartLine /><span>Growth<br /><strong>Built in</strong></span></div>
        <span className="signal-star star-one">✦</span>
        <span className="signal-star star-two">✦</span>
      </motion.div>
    </div>
  </section>
);

export default HomeSignal;
