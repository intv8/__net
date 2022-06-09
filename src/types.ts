import type { IPv4Address } from "./IPv4Address.ts";

export type IPv4Octets = [number, number, number, number];

export type IPv4BitArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export interface IPv4RangePage {
  ips: (IPv4Address | undefined)[];
  count: number;
  page: number;
  next(): IPv4RangePage;
}
