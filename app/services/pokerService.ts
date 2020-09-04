/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  RSocketClient,
  BufferEncoders,
  RSocketResumableTransport,
  encodeAndAddWellKnownMetadata,
  encodeAndAddCustomMetadata,
  TEXT_PLAIN,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING,
  BufferEncoder,
} from 'rsocket-core';
import RSocketTcpClient from 'rsocket-tcp-client';

export default class PokerService {
  private client: RSocketClient<any, any>;

  constructor() {
    const keepAlive = 60000;
    const lifetime = 1000000;
    const dataMimeType = 'message/x.rsocket.routing.v0';
    const metadataMimeType = 'message/x.rsocket.routing.v0';

    this.client = new RSocketClient({
      setup: {
        dataMimeType,
        keepAlive,
        lifetime,
        metadataMimeType,
      },
      transport: new RSocketTcpClient(
        {
          host: '192.168.0.49',
          port: 7000,
        },
        BufferEncoders
      ),
    });

    Promise.resolve(this.connect())
      .finally(() => {
        console.log('done');
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  async connect(): Promise<any> {
    const maxRSocketRequestN = 2147483647;

    await this.client.connect();
    return Promise.resolve();
  }
}
