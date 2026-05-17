export default function CtaBanner({
  title = "Ready to Book Your Pup's Next Groom?",
  text = "Give us a call or send an email — we'd love to welcome your dog to the family.",
}) {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="cta-banner-btns">
          <a href="tel:2019626176" className="btn btn-white">📞 Call 201.962.6176</a>
          <a href="mailto:jaclyn@cozyk9shack.com" className="btn-white-outline">✉️ Email Us</a>
        </div>
      </div>
    </section>
  )
}
