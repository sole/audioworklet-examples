class SineGenerator extends AudioWorkletProcessor {
    _freq = 220.0;

    constructor(...args) {
        super(...args);

        this.port.onmessage = (e) => {
            let { frequency } = e.data;

            // TODO it goes without saying, but we're not checking this is a number, which it should be 8-)
            if (frequency !== undefined) {
                this._freq = frequency;
            }
        };

        this._inverseSampleRate = 1.0 / sampleRate;
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        const numSamples = output[0].length;

        const cst = 2.0 * Math.PI * this._freq * this._inverseSampleRate;
        let pos = currentFrame;

        for (let i = 0; i < numSamples; i++) {
            let v = Math.sin(cst * pos);

            output.forEach((channel) => {
                channel[i] = v;
            });

            pos++;
        }

        return true;
    }
}

registerProcessor("sine-generator", SineGenerator);