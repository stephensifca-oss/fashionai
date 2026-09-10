DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS wa_codes;

CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL UNIQUE,
  email TEXT,
  social_url TEXT,
  social_platform TEXT,      -- instagram | facebook | tiktok | site | autre
  has_no_social INTEGER NOT NULL DEFAULT 0,
  opt_in INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wa_codes (
  code TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  intent TEXT NOT NULL,
  kit_slug TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(lead_id) REFERENCES leads(id) ON DELETE CASCADE
);

CREATE INDEX idx_wa_codes_code ON wa_codes(code);
CREATE INDEX idx_leads_whatsapp ON leads(whatsapp);
