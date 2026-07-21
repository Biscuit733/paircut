self.onmessage = (event: MessageEvent<{ type: 'ping' }>) => {
  if (event.data.type === 'ping') {
    self.postMessage({ type: 'ready' })
  }
}

