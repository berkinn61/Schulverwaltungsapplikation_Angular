export interface Schueler {
  id?: number;
  name: string;
  klasse: string;
  geburtstag?: string;
  alter?: number;
  geschlecht?: 'weiblich' | 'männlich' | 'unbekannt' | string;
}
