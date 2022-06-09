import { IPv4Address } from "./IPv4Address.ts";
import { IPv4Mask } from "./IPv4Mask.ts";
import { IPv4Range } from "./IPv4Range.ts";

export class IPv4Network {
  public static parseCIDR(cidrStr: string): IPv4Network {
    const [ip, prefixStr] = cidrStr.split("/");
    const prefix = parseInt(prefixStr, 10);
    const ipAdd = IPv4Address.parseIPv4(ip);
    const mask = IPv4Mask.fromPrefix(prefix);

    return new IPv4Network(ipAdd, mask);
  }

  public get network(): IPv4Address {
    return this._network;
  }

  public get mask(): IPv4Mask {
    return this._mask;
  }

  public get broadcast(): IPv4Address {
    return this.toRange().last;
  }

  protected _network: IPv4Address;
  protected _mask: IPv4Mask;

  constructor(ip: IPv4Address, mask: IPv4Mask) {
    const hostBits = ip.bits;
    const networkBits = mask.bits;
    networkBits.forEach((v) => {
      if (!v) hostBits.pop();
    });

    const parts = [];

    for (let i = 0; i < hostBits.length; i += 8) {
      const slice = i + 8 > hostBits.length ? hostBits.length - i : 8;
      const octet = hostBits.slice(i, slice + i);
      const rightBits = "0".repeat(8 - octet.length).split("").map((b) =>
        parseInt(b)
      );
      const byte = parseInt([...octet, ...rightBits].join(""), 2);
      parts.push(byte);
    }

    this._network = new IPv4Address(
      parts[0] || 0,
      parts[1] || 0,
      parts[2] || 0,
      parts[3] || 0,
    );
    this._mask = mask;
  }

  public toString(): string {
    return `${this._network}/${this._mask.prefix}`;
  }

  public valueOf(): number {
    const range = this.toRange();

    return +range;
  }

  public toRange(): IPv4Range {
    const firstIp = this.network;
    const netbits = firstIp.bits;
    const hostbits = this.mask.bits.filter((b) => !b).map(() => 1);

    netbits.splice(
      netbits.length - hostbits.length,
      hostbits.length,
      ...hostbits,
    );
    const lastIp = IPv4Address.fromBits(netbits);

    return new IPv4Range(firstIp, lastIp);
  }

  public contains(ip: IPv4Address): boolean {
    const network = ip.mask(this._mask);

    return this.network.equals(network.network);
  }

  public overlaps(net: IPv4Network) {
    const { network, broadcast } = this;
    const range = net.toRange();
    const tRange = this.toRange();

    return range.contains(network) || range.contains(broadcast) ||
      tRange.contains(net.network) || tRange.contains(net.broadcast);
  }
}
