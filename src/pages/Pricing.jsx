import { Link } from 'react-router-dom'

const sizes = [
  {
    key: 'xs',
    abbr: 'XS',
    name: 'Extra Small',
    weight: 'Under 15 lbs',
    bath:    { price: '$40',  time: '1 hour' },
    haircut: { price: '$70',  time: '1 hr 30 min' },
  },
  {
    key: 'sm',
    abbr: 'SM',
    name: 'Small',
    weight: '16–30 lbs',
    bath:    { price: '$50',  time: '1 hour' },
    haircut: { price: '$95',  time: '1 hr 30 min' },
  },
  {
    key: 'md',
    abbr: 'MD',
    name: 'Medium',
    weight: '31–50 lbs',
    bath:    { price: '$60',  time: '1 hr 30 min' },
    haircut: { price: '$95',  time: '2 hours' },
  },
  {
    key: 'lg',
    abbr: 'LG',
    name: 'Large',
    weight: '51–80 lbs',
    bath:    { price: '$70',  time: '2 hours' },
    haircut: { price: '$110', time: '2 hr 30 min' },
  },
  {
    key: 'xl',
    abbr: 'XL',
    name: 'Extra Large',
    weight: '81+ lbs',
    bath:    { price: '$90',  time: '2 hr 30 min' },
    haircut: { price: '$160', time: '3 hours' },
  },
]

const addons = [
  { name: 'Nail Dremel',     price: '$15', time: '5 min',  note: 'Standalone visit' },
  { name: 'Teeth Brushing',  price: 'Ask', time: '—',      note: 'Available on request' },
  { name: 'Ear Plucking',    price: 'Ask', time: '—',      note: 'Available on request' },
  { name: 'Gland Expression',price: 'Ask', time: '—',      note: 'Available on request' },
]

export default function Pricing() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Pricing</span>
          <h1 className="page-title">Starting Prices &amp; What's Included</h1>
          <p className="page-lede">
            Every groom includes a bath &amp; blow dry, nail dremel, ear cleaning,<br />
            and a deshedding bath — no surprise fees for the basics.
          </p>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Weight</th>
                  <th>Bath</th>
                  <th>Haircut</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.key}>
                    <td>
                      <div className="size-cell">
                        <span className="size-abbr">{s.abbr}</span>
                        <span className="size-name">{s.name}</span>
                      </div>
                    </td>
                    <td>{s.weight}</td>
                    <td>
                      <div className="price-cell">
                        <span className="price">{s.bath.price}</span>
                        <span className="duration">{s.bath.time}</span>
                      </div>
                    </td>
                    <td>
                      <div className="price-cell">
                        <span className="price">{s.haircut.price}</span>
                        <span className="duration">{s.haircut.time}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="addon-grid">
            <h2 className="section-title" style={{ marginBottom: 20 }}>Add-Ons &amp; Standalone Services</h2>
            <div className="addon-list">
              {addons.map((a) => (
                <div key={a.name} className="addon-row">
                  <div>
                    <div className="addon-name">{a.name}</div>
                    <div className="addon-note">{a.note}</div>
                  </div>
                  <div className="addon-price">
                    <span className="price">{a.price}</span>
                    {a.time !== '—' && <span className="duration">{a.time}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pricing-notes">
            <div className="note-card">
              <strong>💚 Free between grooms:</strong> Nail maintenance is always
              complimentary up to 5 weeks after your last full groom.
            </div>
            <div className="note-card">
              <strong>📝 Please note:</strong> Prices listed are starting points
              and may vary based on your dog's coat condition and behavior.
              Appointment duration may vary as well, additional charges may
              apply. If you have any questions, please feel free to reach out.
            </div>
            <div className="note-card">
              <strong>💳 Accepted payment methods:</strong> Card, Cash, Venmo, and Zelle.
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to book?</h2>
          <p>Call or email to schedule your pup's appointment.</p>
          <div className="cta-banner-btns">
            <a href="tel:2019626176" className="btn btn-white">📞 Call 201.962.6176</a>
            <Link to="/contact" className="btn-white-outline">Contact Me →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
