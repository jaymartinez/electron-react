/* eslint-disable no-debugger */
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
import RegisterModel from '../models/RegisterModel';

export default class PokerService {
  // eslint-disable-next-line class-methods-use-this
  async registerUser(model: RegisterModel): Promise<any> {
    const maxRSocketRequestN = 2147483647;
    const keepAlive = 60000;
    const lifetime = 100000;
    const dataMimeType = MESSAGE_RSOCKET_ROUTING.string;
    const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;
    const route = 'user-manager-register-user';

    const client = new RSocketClient({
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

    client.connect().subscribe({
      onComplete: (socket) => {
        socket
          .requestStream({
            data: Buffer.from(JSON.stringify(model)),
            metadata: encodeAndAddWellKnownMetadata(
              encodeAndAddCustomMetadata(
                Buffer.alloc(1),
                TEXT_PLAIN.string,
                Buffer.from('A')
              ),
              MESSAGE_RSOCKET_ROUTING,
              Buffer.from(String.fromCharCode(route.length) + route)
            ),
          })
          .subscribe({
            onComplete: () => console.log('Request stream complete'),
            onError: (error) => console.log(error.message),
            onNext: (value) => console.log('%s', value.data),
            onSubscribe: (sub) => {
              debugger;
              sub.request(maxRSocketRequestN);
            },
          });
      },
    });

    return Promise.resolve();
  }
}
