type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Money {
  currency: string;
  amount: number;
}

export interface AvailabilityTimeOfDay {
  localHour: number;
  localMinute: number;
}

export interface AvailabilityPeriod {
  dayOfWeek: DayOfWeek;
  start: AvailabilityTimeOfDay;
  end: AvailabilityTimeOfDay;
}

export interface Catalog {
  id: string;
  name: string;
  description?: string;
  merchantLocation: string;
  collections: string[];
  availabilityPeriods?: AvailabilityPeriod[];
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  items: string[];
  childCollections: string[];
}

export interface Item {
  id: string;
  name: string;
  priceMoney: Money;
  description?: string;
  suspended: boolean;
  modifierGroups: string[];
}

export interface ModifierGroup {
  id: string;
  name: string;
  minimumSelection: number;
  maximumSelection: number;
  maximumOfEachModifier: number;
  modifiers: string[];
}

export interface Modifier {
  id: string;
  name: string;
  priceMoney: Money;
  suspended: boolean;
  childModifierGroups: string[];
}

export interface Catalogs {
  catalogs: Record<string, Catalog>;
  collections: Record<string, Collection>;
  items: Record<string, Item>;
  modifierGroups: Record<string, ModifierGroup>;
  modifiers: Record<string, Modifier>;
}
