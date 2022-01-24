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

export interface IDnsResolverOptions {
  ip: IPv4Address;
  port: number;
}
