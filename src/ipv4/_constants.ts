//  Network reservations

// const RFC1122_THIS = [[0, 0, 0, 0], [0, 255, 255, 255]];
const RFC1918_CLASS_A = [[10, 0, 0, 0], [10, 255, 255, 255]];
export const RFC1122_LOOPBACK = [[127, 0, 0, 0], [127, 255, 255, 255]];
export const RFC3927_LINK_LOCAL = [[169, 254, 0, 0], [169, 254, 255, 255]];

const RFC1918_CLASS_B = [[172, 16, 0, 0], [172, 31, 255, 255]];
// const RFC5736_PROTO_ASGN = [[192, 0, 0, 0], [192, 0, 0, 255]];
// const RFC5737_TEST_1 = [[192, 0, 2, 0], [192, 0, 2, 255]];
// const RFC3068_6_4_RELAY = [[192, 88, 99, 0], [192, 88, 99, 255]];
const RFC1918_CLASS_C = [[192, 168, 0, 0], [192, 168, 255, 255]];
// const RFC2544_NID_BENCH = [[198, 18, 0, 0], [198, 19, 255, 255 ]];
// const RFC5737_TEST_2 = [[198, 51, 100, 0], [198, 51, 100, 255]];
// const RFC5737_TEST_3 = [[203, 0, 113, 0], [203, 0, 113, 255]];
// const RFC3171_MULTICAST = [[224, 0, 0, ], [239, 255, 255, 255]];
// const RFC1112_RESERVED = [[240, 0, 0, 0], [255, 255, 255, 255]];

const RFC791_CLASS_A = [[1, 0, 0, 0], [127, 255, 255, 255]];
const RFC791_CLASS_B = [[128, 0, 0, 0], [191, 255, 255, 255]];
const RFC791_CLASS_C = [[192, 0, 0, 0], [223, 255, 255, 255]];
const RFC791_CLASS_D = [[224, 0, 0, 0], [239, 255, 255, 255]];
const RFC791_CLASS_E = [[240, 0, 0, 0], [255, 255, 255, 255]];

export const RFC791_CLASS_RANGES = {
  A: RFC791_CLASS_A,
  B: RFC791_CLASS_B,
  C: RFC791_CLASS_C,
  D: RFC791_CLASS_D,
  E: RFC791_CLASS_E,
};

export const RFC791_CLASS_DEFAULT_MASKS = {
  A: [255, 0, 0, 0],
  B: [255, 255, 0, 0],
  C: [255, 255, 255, 0],
  D: undefined,
  E: undefined,
};

export const RFC1918_PRIVATE_ADDRESSES = [
  RFC1918_CLASS_A,
  RFC1918_CLASS_B,
  RFC1918_CLASS_C,
];
