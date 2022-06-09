import { IPv4Address } from "./IPv4Address.ts";
import { IPv4RangePage } from "./types.ts";
export class IPv4Range {
  public get range(): [IPv4Address, IPv4Address] {
    return [...this._range];
  }

  public get first(): IPv4Address {
    return this.range[0];
  }

  public get last(): IPv4Address {
    return this.range[1];
  }

  protected _range: [IPv4Address, IPv4Address];

  constructor(start: IPv4Address, end: IPv4Address) {
    const b = parseInt(start.bits.join(""), 2);
    const e = parseInt(end.bits.join(""), 2);
    
    if (e < b) {
      [start, end] = [end, start];
    }

    this._range = [start, end];
  }

  public valueOf(): number {
    const { first, last } = this;
    const firstNumber = parseInt(first.bits.join(""), 2);
    const lastNumber = parseInt(last.bits.join(""), 2);

    return lastNumber - firstNumber;
  }

  public toString(): string {
    return `${this._range[0]} - ${this._range[1]}`;
  }

  [Symbol.iterator]() {
    const firstNumber = parseInt(this.first.bits.join(""), 2);

    return {
      next() {
        if (this.current > this.max) {
          return { done: true };
        }

        const value = firstNumber + this.current;
        const bitStr = value.toString(2);
        const byteStr = `${"0".repeat(32 - bitStr.length)}${bitStr}`;
        const bitArray = byteStr.split("");
        const bits = bitArray.map((b) => parseInt(b));
        const octets = [];

        while (bits.length) {
          const byte = bits.splice(0, 8);
          const byteStr = byte.join("");
          const decVal = parseInt(byteStr, 2);
          octets.push(decVal);
        }

        this.current += 1;

        return {
          value: new IPv4Address(octets[0], octets[1], octets[2], octets[3]),
          done: false,
        };
      },
      max: +this,
      current: 0,
    };
  }

  public contains(ip: IPv4Address): boolean {
    const [start, end] = this._range;
    const b = parseInt(start.bits.join(""), 2);
    const e = parseInt(end.bits.join(""), 2);
    const a = parseInt(ip.bits.join(""), 2);

    return a >= b && a <= e;
  }

  public page(count = 25, page = 0): IPv4RangePage {
    const block = [...this].splice(page * count, count);

    return {
      ips: block,
      count: block.length,
      next: () => {
        if (block.length === 0) {
          return this.page(count, page);
        }

        return this.page(count, ++page);
      },
      page: page,
    };
  }
}
