/* eslint-disable class-methods-use-this */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  RSocketClient,
  BufferEncoders,
  encodeAndAddWellKnownMetadata,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING,
  APPLICATION_CBOR,
} from 'rsocket-core';
import cbor from 'cbor';
import RSocketTcpClient from 'rsocket-tcp-client';
import RegisterModel from '../models/RegisterModel';

export default class PokerService {
  // eslint-disable-next-line class-methods-use-this
  async registerUser(model: RegisterModel): Promise<any> {
    const keepAlive = 60000;
    const lifetime = 100000;
    const dataMimeType = APPLICATION_CBOR.string;
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

    const buf = cbor.encode(model);

    client.connect().subscribe({
      onComplete: (socket) => {
        socket
          .requestResponse({
            data: buf,
            metadata: encodeAndAddWellKnownMetadata(
              Buffer.alloc(0),
              MESSAGE_RSOCKET_ROUTING,
              this.encodeRoute(route)
            ),
          })
          .subscribe({
            onComplete: () => {
              console.log('Request stream complete');
            },
            onError: (error) => {
              console.error(error.message);
            },
            onSubscribe: (sub) => {
              console.log('onSubscribe()');
            },
          });
      },
    });

    return Promise.resolve();
  }

  encodeRoute(r: any) {
    const len = Buffer.byteLength(r, 'utf-8');
    const buf = Buffer.alloc(1);
    buf.writeInt8(len, 0);
    return Buffer.concat([buf, Buffer.from(r, 'utf-8')]);
  }
}
