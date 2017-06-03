package cn.qiuxiang.react.amap3d;

import android.content.Context;

import com.facebook.react.views.view.ReactViewGroup;

public class AMapOverlay extends ReactViewGroup {
    private OnUpdateListener onUpdateListener;

    public AMapOverlay(Context context) {
        super(context);
    }

    public void setOnUpdateListener(OnUpdateListener listener) {
        onUpdateListener = listener;
    }

    public void update() {
        if (onUpdateListener != null) {
            onUpdateListener.onUpdate();
        }
    }

    interface OnUpdateListener {
        void onUpdate();
    }
}
