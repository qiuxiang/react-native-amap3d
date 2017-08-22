package cn.qiuxiang.react.amap3d.maps

import android.content.Context
import android.graphics.Color
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import com.amap.api.maps.AMap.InfoWindowAdapter
import com.amap.api.maps.model.Marker

class AMapInfoWindowAdapter(
        private val context: Context,
        private val markers: HashMap<String, AMapMarker>
) : InfoWindowAdapter {
    val paddingTop = context.resources.displayMetrics.density

    override fun getInfoWindow(marker: Marker): View? {
        return markers[marker.id]?.infoWindow
    }

    override fun getInfoContents(marker: Marker): View? {
        val layout = LinearLayout(context)
        layout.orientation = LinearLayout.VERTICAL

        val titleView = TextView(context)
        titleView.text = marker.title
        titleView.setTextColor(Color.parseColor("#212121"))
        layout.addView(titleView)

        val snippet = marker.snippet
        if (!snippet.isEmpty()) {
            val snippetView = TextView(context)
            snippetView.text = snippet
            snippetView.maxEms = 12
            snippetView.setPadding(0, paddingTop.toInt(), 0, 0)
            snippetView.setTextColor(Color.parseColor("#757575"))
            layout.addView(snippetView)
        }

        return layout
    }
}

