describe('OptionsManager', function () {

    var sinon = require('sinon');
    var assert = require('chai').assert;
    var OptionsManager = require('../../src/index');

    it('Retrieve initially defined options.', function () {
        var optMgr = new OptionsManager({
            opt1: 'string1',
            opt2: 2,
            opt3: '',
            opt4: false,
            opt5: 0
        });

        assert.deepEqual(optMgr.get('opt1'), 'string1');
        assert.deepEqual(optMgr.get('opt2'), 2);
        assert.deepEqual(optMgr.get('opt3'), '');
        assert.deepEqual(optMgr.get('opt4'), false);
        assert.deepEqual(optMgr.get('opt5'), 0);

        assert.deepEqual(optMgr.get('opt6'), undefined);
    });


    it('Handle default option values.', function () {
        var optMgr = new OptionsManager({
            opt1: 'string1'
        }, {
            opt1: 'string0',
            opt2: 2
        });

        assert.deepEqual(optMgr.get('opt1'), 'string1');
        assert.deepEqual(optMgr.get('opt2'), 2);
    });


    it('Allow attaching handler on option value change', function () {
        var handler1 = sinon.spy();
        var handler2 = sinon.spy();

        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.onChange('opt1', handler1);
        optMgr.onChange('opt2', handler2);

        optMgr.set('opt1', 'string_other');
        optMgr.set('opt2', 2);

        assert.isTrue(handler1.calledWith('string_other', 'string1'));
        assert.isTrue(handler1.calledOnce);

        assert.isTrue(handler2.calledWith(2, undefined));
        assert.isTrue(handler2.calledOnce);
    });


    it('Set option override previous value.', function () {
        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.set('opt1', 'string_other');

        assert.deepEqual(optMgr.get('opt1'), 'string_other');
    });


    it('Remove onChange handler do not call it anymore.', function () {
        var handler = sinon.spy();

        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.onChange('opt1', handler);
        optMgr.onChange('opt1', undefined);

        optMgr.set('opt1', 'string_other');

        assert.isTrue(handler.notCalled);
    });


    it('Change onChange handler do not call it anymore.', function () {
        var handler1 = sinon.spy();
        var handler2 = sinon.spy();

        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.onChange('opt1', handler1);
        optMgr.onChange('opt1', handler2);

        optMgr.set('opt1', 'string_other');

        assert.isTrue(handler1.notCalled);
        assert.isTrue(handler2.calledWith('string_other', 'string1'));
        assert.isTrue(handler2.calledOnce);
    });


    it('Determine if handler is associated to option value change event.', function () {
        var handler = sinon.stub();

        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.onChange('opt1', handler);

        assert.isTrue(optMgr.hasChangeHandler('opt1'));
    });


    it('Notify non-existing option should not fail.', function () {
        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.notify('opt2');
    });


    it('Notify option should call handler.', function () {
        var handler = sinon.spy();

        var optMgr = new OptionsManager({
            opt1: 'string1'
        });

        optMgr.onChange('opt1', handler);
        optMgr.notify('opt1');

        assert.isTrue(handler.calledOnce);
        assert.isTrue(handler.calledWith('string1', 'string1'));
    });
});