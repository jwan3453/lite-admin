/**
 * Created by chenlingguang on 2017/6/1.
 */

const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export function validateIpv4(ip) {
  return ipv4.test(ip);
}

export function validateMultiIpv4(ips) {
  const ipArray = ips.split(',');
  for (let i = 0; i < ipArray.length; i += 1) {
    if (!ipv4.test(ipArray[i])) return false;
  }
  return true;
}
