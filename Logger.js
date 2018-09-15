const EventEmitter = require('events');

class Loggers extends EventEmitter
{
    log()
    {
              this.emit('Messageloaded', {id:1,name:'message'})       
    }
}

module.exports = Loggers;


//index.js

const EventEmitter = require('events');


const Logger = require('./Logger');

const logger = new Logger();

logger.on('Messageloaded', (args) => 
 {
    console.log('message received!!',args);
 }
)


logger.log();