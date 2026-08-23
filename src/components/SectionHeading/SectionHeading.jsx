const SectionHeading = ({ number, title, subtitle }) => (
  <div className="section-heading">
    <div className="section-heading-number">{number}</div>
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  </div>
);

export default SectionHeading;
