# Future analytics and consent plan

Status: specification only. No tracking library or remote analytics is installed in this prototype. No event or conversion has been reported as achieved.

| Event | Trigger after integration | Permitted properties |
|---|---|---|
| page_view | Route view | Route, consented UTM source/campaign |
| offer_card_view | Meaningful visible exposure | Offer ID, route |
| demo_open | Open isolated demo | Entry route, campaign |
| pilot_cta | Evaluation CTA click | Placement, selected offer ID |
| form_start | First form interaction | Form kind; no field values |
| form_submit | Confirmed real server acceptance | Form kind, consent version, opaque request ID |
| meeting_booked | Verified booking completion | Opaque request ID, campaign; no names/email |

Do not fire form_submit for the local “preview validated” state. Never infer meeting_booked from a click. Exclude operational records, personal field values and source excerpts from analytics. Do not put email addresses in URLs or event payloads.

Deduplicate contacts in a permissioned lead system, separately from anonymous analytics. Separate permission for inquiry follow-up from optional marketing consent. Publish a controller/contact channel, retention periods and deletion process before accepting real requests. Honor deletion requests across the connected lead system and relevant processors.

Track distinct budget owner, named operator, authorized dataset status and willingness to pay separately in the human-reviewed evaluation process. Keep adjacent buyer segments separate. Judge paid shadow-pilot commitments against qualified opportunities, not visits or waitlist totals.

For future capped LinkedIn experiments, record audience, message variant, actual spend, actual clicks, qualified conversations and consented requests. Compare the feasibility-proof message with the human-reviewed evidence-packet message. Precommit the cap and stopping rules; do not create sample performance claims.
