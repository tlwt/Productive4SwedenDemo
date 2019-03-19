    // add test data
    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
        var ret = [this.getFullYear(), "-", (mm < 10) ? '0' : '', mm, "-", (dd < 10) ? '0' : '', dd].join('');

        return ret; // padding
    };

    Date.prototype.tomorrow = function() {
        var d = new Date(this);
        d.setDate(d.getDate() + 1);
        return d;
    }

    var today = (new Date()).yyyymmdd();
    var seed = (Math.random() - 0.4) * 100000;

    function generate(days) {
        for (let i = 0; i < days; i++) {
            seed += (Math.random() - 0.4) * 10000;
            if (Math.random() < 0.07) seed = -d3.max(data.values())
            data.set(new Date(today), seed);
            today = new Date(today).tomorrow();
        }
    }