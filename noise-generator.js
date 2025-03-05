class NoiseGenerator extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
        const output = outputs[0];
        const numSamples = output[0].length;

        for (let i = 0; i < numSamples; i++) {
            let v = 2.0 * Math.random() - 1;
            output.forEach((channel) => {
                channel[i] = v;
            });
        }

        return true;
    }
}

registerProcessor("noise-generator", NoiseGenerator);