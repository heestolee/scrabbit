export async function waitForSSLCertification(subdomain) {
  const maxRetries = 20;
  const interval = 3000;
  let retries = 0;

  while (retries < maxRetries) {
    const response = await fetch(`https://${subdomain}.scrabbit.site`).catch(
      () => null,
    );

    if (response && response.ok) {
      return;
    }

    retries++;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error("SSL 인증이 완료되지 않았습니다. 나중에 다시 시도해주세요.");
}
