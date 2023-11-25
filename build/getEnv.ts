export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    // 判断是否是纯字符串数字，如果是则转换成数字类型
    if (!isNaN(parseFloat(realName)) && isFinite(realName)) realName = Number(realName);
    if (envName === 'VITE_PROXY') realName = JSON.parse(realName);
    ret[envName] = realName;
  }
  // console.log('RET', ret);
  return ret;
}