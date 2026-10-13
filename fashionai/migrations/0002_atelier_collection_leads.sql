-- Migration 0002 : Ajout des champs de qualification atelier collection
ALTER TABLE leads ADD COLUMN mode_prefere TEXT;
ALTER TABLE leads ADD COLUMN segment_creation TEXT;
ALTER TABLE leads ADD COLUMN etablissement TEXT;
