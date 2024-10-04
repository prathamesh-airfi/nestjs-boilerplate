import * as chalk from 'chalk';
import { Connection } from 'mongoose';

export const getDatabaseStatus = (connection: Connection): string => {
  switch (connection.readyState) {
    case 0:
      return chalk.bgWhiteBright(chalk.redBright(' DISCONNECTED '));
    case 1:
      return chalk.bgBlackBright(chalk.greenBright(' CONNECTED '));
    case 2:
      return chalk.greenBright(' CONNECTING ');
    case 3:
      return chalk.redBright(' DISCONNECTING ');
    default:
      return 'UNKOWN';
  }
};

export const getRedisStatus = (redisStatus: string): string => {
  switch (redisStatus) {
    case 'ready':
      return chalk.bgBlackBright(chalk.greenBright(' CONNECTED '));
    case 'connecting':
      return chalk.green(' CONNECTING ');
    case 'end':
      return chalk.bgWhiteBright(chalk.redBright(' DISCONNECTED '));
    default:
      return redisStatus;
  }
};

export const getNodeEnvironment = (nodeEnv: string): string => {
  const _nodeEnv = nodeEnv.toUpperCase();
  if (_nodeEnv === 'DEVELOPMENT' || _nodeEnv === 'TEST') {
    return chalk.whiteBright(chalk.bgYellowBright(` ${_nodeEnv} `));
  } else {
    return chalk.bgWhiteBright(chalk.greenBright(` ${_nodeEnv} `));
  }
};

export const getApplicationPort = (port: number) => {
  return chalk.redBright(` ${port} `);
};

export const getFormattedConsole = (formatComponents: {
  port: string;
  nodeEnv: string;
  dbConnStatus: string;
  redisStatus: string;
}) => {
  const { port, dbConnStatus, nodeEnv, redisStatus } = formatComponents;

  return `
    --------------------------------------------------------------------------------------------------
    |                                                                                                |
    |             ██████╗  ██████╗ ██████╗ ████████╗ █████╗ ██╗         ██╗   ██╗██████╗             | 
    |             ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔══██╗██║         ██║   ██║╚════██╗            |
    |             ██████╔╝██║   ██║██████╔╝   ██║   ███████║██║         ██║   ██║ █████╔╝            | 
    |             ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══██║██║         ╚██╗ ██╔╝██╔═══╝             |
    |             ██║     ╚██████╔╝██║  ██║   ██║   ██║  ██║███████╗     ╚████╔╝ ███████╗            |
    |             ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝      ╚═══╝  ╚══════╝            |
    |                                                                                                |
    --------------------------------------------------------------------------------------------------
                                                                                                    
                    APPLICATION PORT: ${port}       DATABASE STATUS: ${dbConnStatus}                                                                                                                                                                           
                    REDIS STATUS: ${redisStatus}    NODE_ENV STATUS: ${nodeEnv} 

    |------------------------------------------------------------------------------------------------| 
  `;
};
